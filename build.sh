rm -rf build
mkdir build
cp -r pets build/
cp picker*.js build
cp picker.html build/index.html
node createPetJs.js > build/pets.js
