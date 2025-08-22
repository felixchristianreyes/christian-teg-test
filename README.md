Step to run locally:

Step 1: 
npm install

Step 2: 
Create .env file with
VITE_EVENTS_LISTING_API_URL="https://teg-coding-challenge.s3.ap-southeast-2.amazonaws.com/events/event-data.json"

Step 3:
npm run dev

Tech stack used:

React, Vite, TailwindCSS, React Router, ShadCN, Typescript

Is hosted at: https://christian-teg-test-mo2j.vercel.app/

Do note that I am using a cors proxy to somehow bypass the security restriction when fetching the api. So it might not work depending on the volume on the free cors proxy middleware that I am using which is https://allorigins.win/
