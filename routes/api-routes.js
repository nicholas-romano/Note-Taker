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

  app.get("/api/notes/:id", (req, res) => {
    //get id selected:
    var chosen_note_id = parseInt(req.params.id);

    for (let key in notes) {

      let {id, title, text} = notes[key];

      //find matching id in json and return object:
      if (id === chosen_note_id) {
        res.json({"id": id, "title": title, "text": text});
      }

    }

  });

  
};