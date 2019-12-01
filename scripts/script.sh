#!/bin/bash
cd server/
npm test
npm run coverage
cd ..

pip install --user awscli
aws s3 cp s3://movers3/.env.stage server/.env
aws s3 cp s3://movers3/.env.client client/.env

cd client/
npm run build
rm -rf !("build")
cd ..

zip -r latest * > /dev/null
mkdir -p dpl_cd_upload
mv latest.zip dpl_cd_upload/latest.zip
