let notes = require('../db/db.json');

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    const note = req.body;

    //find the highest id number:
    let highest = 1;
    for (let key in notes) {
      let id = notes[key].id;
      if (id > highest) {
        highest = id;
      }
    }

    //add one to the highest number and set it to the new note:
    note.id = highest + 1;
    notes.push(note);
    res.json(note);

  });

  
};