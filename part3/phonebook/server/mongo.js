const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mehukatti:${password}@cluster0.br5bc.mongodb.net/?retrywrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const numSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Number', numSchema)

if (process.argv.length > 4) {
  const newName = process.argv[3]
  const newNumber = process.argv[4]

  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook.`)
    mongoose.connection.close()
  })
}
else {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

}
