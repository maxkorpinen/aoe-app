function importAll(r) {
  let images = {}
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); })
  return images
}

const civImages = importAll(require.context('../images/civs', false, /\.(png|jpe?g|svg|webp)$/))
const unitImages = importAll(require.context('../images/units', false, /\.(png|jpe?g|svg|webp)$/))

export default {civImages, unitImages}