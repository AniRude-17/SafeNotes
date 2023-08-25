const { MD5, AES, enc } = require('crypto-js');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.listen(8000,'0.0.0.0');

const KEY = "abcd1010abcd";

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'notes'
});

app.get('/', (req, res) => {
  const q = "SELECT * FROM notes.note;";
  db.query(q, (err, data) => {
    if (err) res.send(err);
    else{
      const all=JSON.stringify(data,'',5);
      res.type('application/json').send(all);
    }
  });
});

app.post('/add', (req, res) => {
  const q = "INSERT INTO `notes`.`note` (`id`, `passhash`, `content`) VALUES (?, ?, ?);";
  const pw = req.body.passhash;
  const hashpw = MD5(pw).toString();
  const encpt = AES.encrypt(req.body.content, KEY).toString();
  const values = [
    req.body.id,
    hashpw,
    encpt,
  ];
  db.query(q, values, (err, data) => {
    if (err) res.send("Note with the same id exists");
    res.send("Values Inserted");
  });
});

app.get('/view-existence', (req, res) => {
  const q = "SELECT * FROM notes.note WHERE id = ? ;";
  const note_id = req.query.id;
  db.query(q, note_id, (err, data) => {
    if (err) return res.send(err);
    if (data.length === 0) return res.send("NO");
    return res.send("YES");
  });
});

app.get('/view-full', (req, res) => {
  const q = "SELECT content FROM notes.note WHERE id = ? AND passhash = ? ;";
  const note_id = req.query.id;
  const pw = req.query.password;
  const passhash = MD5(pw).toString();
  db.query(q, [note_id, passhash], (err, data) => {
    if (err) return res.send(err);
    else {
      if (data.length === 0)
        return res.send("WRONG PASSWORD");
      else {
        const decryptedData = AES.decrypt(data[0].content, KEY).toString(enc.Utf8);
        return res.send(decryptedData);
      }
    }
  });
});

app.post('/update', (req, res) => {
  const encpt = AES.encrypt(req.body.content, KEY).toString();
  const values = [
    encpt,
    req.body.id
  ];
  const q = "UPDATE notes.note SET content=? WHERE id=?";

  db.query(q, values, (err, data) => {
    if (err) res.send("bad command");
    res.send(data);
  });
});
