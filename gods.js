
const gods = { 
    Zeus: { 
      live: 'Olympus', 
      symbol: 'Thunderbolt' }, 
    Hades : { 
      live : 'Underworld', 
      symbol: 'Cornucopia' 
    } 
  };
  
  app.get('/gods', (req, res) => res.send(gods))
  
  app.get('/gods/:name', (req, res) => {
    
    var name = gods[req.params,name]
    console.log(req.query)
      if (name) {
      res.status(200).send(name);
    } else {
      res.status(404).send('Nose se encontro el Dios');
    }
  })
  
  app.put('/gods/:name', (req, res) => {
    const god = req.body;
    gods[req.params.name] = god;
    res.status(200).send(gods);
  })
  
  app.post('/gods', (req, res) => {
    const name = req.query.name
    const newGod = req.body;
    gods[name] = newGod;
    res.status(200).send(gods);
  })
  
  
  app.delete('/gods/:name', (req, res) =>{
    const name = req.params.name;
    if (delete gods[name])
      res.send(200).send(gods)
    else
      res.status(500)
  })
  
  