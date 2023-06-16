import exifr from 'exifr';

export default function imageLoad(img: HTMLImageElement) {

    const handleOnLoaded = async (m: any) => {
        console.log("on loaded", m);

        let position = await exifr.gps(img)
        if (position) {
            console.log(position.latitude, position.longitude);
            img.dispatchEvent(new CustomEvent("position", 
                {detail: {
                    latitude: position.latitude, 
                    longitude: position.longitude
                }}));
        }
        else {            
            console.log("no position found");
            img.dispatchEvent(new CustomEvent("position",
                {detail: {
                    latitude: 0, 
                    longitude: 0
                }}));
        }
    }

    if (img.complete) {
        handleOnLoaded("complete");
    }

    

    img.addEventListener('load', handleOnLoaded);    

    return {
		destroy() {
			img.removeEventListener("load", handleOnLoaded, true);
		}
    }
}