export function generateRandomHex() {
    // Generate a random number between 0 and 16777215 (0xFFFFFF in decimal)
    const randomNumber = Math.floor(Math.random() * 16777215);
  
    // Convert the number to hexadecimal and pad with zeros if necessary
    return "#" + randomNumber.toString(16).padStart(6, "0");
  }

  export const calculateTintAndShade = (
    hexColor, // using #663399 as an example
    percentage = 0.1 // using 10% as an example
) => {
    const r = parseInt(hexColor.slice(1, 3), 16); // r = 102
    const g = parseInt(hexColor.slice(3, 5), 16); // g = 51
    const b = parseInt(hexColor.slice(5, 7), 16); // b = 153

    /* 
       From this part, we are using our two formulas
       in this case, here is the formula for tint,
       please be aware that we are performing two validations
       we are using Math.min to set the max level of tint to 255,
       so we don't get values like 280 ;)
       also, we have the Math.round so we don't have values like 243.2
       both validations apply for both tint and shade as you can see */
    const tintR = Math.round(Math.min(255, r + (255 - r) * percentage)); // 117
    const tintG = Math.round(Math.min(255, g + (255 - g) * percentage)); // 71
    const tintB = Math.round(Math.min(255, b + (255 - b) * percentage)); // 163

   
    const shadeR = Math.round(Math.max(0, r - r * percentage)); // 92
    const shadeG = Math.round(Math.max(0, g - g * percentage)); // 46
    const shadeB = Math.round(Math.max(0, b - b * percentage)); // 138


    /* 
       Now with all the values calculated, the only missing stuff is 
       getting our color back to hexadecimal, to achieve that, we are going
       to perform a toString(16) on each value, so we get the hex value
       for each color, and then we just append each value together and voilà!*/
    return {
        tint: {
            r: tintR,
            g: tintG,
            b: tintB,
            hex:
                '#' +
                [tintR, tintG, tintB]
                    .map(x => x.toString(16).padStart(2, '0'))
                    .join(''), // #7547a3 
        },
        shade: {
            r: shadeR,
            g: shadeG,
            b: shadeB,
            hex:
                '#' +
                [shadeR, shadeG, shadeB]
                    .map(x => x.toString(16).padStart(2, '0'))
                    .join(''), // #5c2e8a 
        },
    };
};

export async function fetchDailyColors(numYears = 15) {
    const today = new Date();
    const requests = [];
  
    for (let i = 0; i < numYears; i++) {
      const year = today.getFullYear() - i;
      const month = `${today.getMonth() + 1}`.padStart(2, "0")
      const day = `${today.getDate()}`.padStart(2, "0")
      const date = `${year}-${month}-${day}` ;
      const url = `https://colors.zoodinkers.com/api?date=${date}`;
      requests.push(fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch color for ${date}`);
          }
          return response.json();
        })
        .then((data) => data.hex)
        .catch((error) => {
          console.error(error.message);
          return generateRandomHex(); // Default color on error
        }));
    }
  
    return Promise.all(requests);
  }