const fs = require('fs').promises;

async function* ls(path) {
  const dir = await fs.opendir(path);
  for await (const dirent of dir) {
    yield dirent;
  }
}

(async () => {
    const pets = [];

    for await (const petDir of ls('pets')) {
        const petName = petDir.name;

        for await (const stateDir of ls(`pets/${petName}`)) {
            const state = stateDir.name;

            const petPath = `pets/${petName}/${state}`;

            for await (const variationDir of ls(petPath)) {
                const variation = variationDir.name.substring(0, variationDir.name.length - '.png'.length);

                const pet = {
                    name: variation.split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    id: `${petDir.name}-${state}-${variation}`,
                    image: `${petPath}/${variationDir.name}`,
                    evolved: state === 'evolved',
                    normal: state === 'normal',
                };
                pets.push(pet);
            }
        }
    }

    console.log(`var pets = ${JSON.stringify(pets, null, 2)}`);
})();