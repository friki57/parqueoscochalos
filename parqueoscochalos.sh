#!/bin/bash

# codigo para clonar automaticamente el repositorio de github

rm parqueoscochalos -r
git clone https://github.com/friki57/parqueoscochalos.git
cd parqueoscochalos
npm rebuild
npm start
