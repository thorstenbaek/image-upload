import { writeFileSync } from 'fs';

/** @type {import('./$types').Actions} */
export const actions = {
    upload: async (event) => {        
        const formData = await event.request.formData();        
        formData.forEach((value, key) => {
            if (key == "image")
            {
                try {
                    writeFileSync("static/avatar.png", value.valueOf().toString(), 'base64');        
                    console.log("Successfully updated static/avatar.png");
                } catch (error) {
                    console.log(error);
                }
                
            }
        });
    }
  };