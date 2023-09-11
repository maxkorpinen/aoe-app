





civs = ['Aztecs', 
        'Bengalis',
        'Berbers', 
        'Bohemians',
        'Britons',
        'Bulgarians',
        'Burgundians',
        'Burmese',
        'Byzantines',
        'Celts',
        'Chinese',
        'Cumans',
        'Dravidians',
        'Ethiopians',
        'Franks',
        'Goths',
        'Gurjaras',
        'Hindustanis',
        'Huns',
        'Incas',
        'Italians',
        'Japanese',
        'Khmer',
        'Koreans',
        'Lithuanians',
        'Magyars',
        'Malay',
        'Malians',
        'Mayans',
        'Mongols',
        'Persians',
        'Poles',
        'Portuguese',
        'Saracens',
        'Sicilians',
        'Slavs',
        'Spanish',
        'Tatars',
        'Teutons',
        'Turks',
        'Vietnamese',
        'Vikings']



const app = require('./app')

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})