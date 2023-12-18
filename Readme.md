# Yoga Enrollment Form
https://frightened-wasp-robe.cyclic.app/enroll

## Steps to Run

- clone this repo

- docker build -t yoga_form .

- docker container run -e URI=<mongodb_url> -e PORT=3000 -d yoga_form

