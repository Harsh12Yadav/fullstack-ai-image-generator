import {surpriseMePrompts} from '../constants';
import FileSaver from 'file-saver';

export function getRandomPromt(prompt){
    const randomIndex=Math.floor(Math.random()* surpriseMePrompts.length);
    const randomPromt=surpriseMePrompts[randomIndex];

    if(randomPromt===prompt) return getRandomPromt(prompt);

    return randomPromt;
}

export async function downloadImage(_id,photo) {
    FileSaver.saveAs(photo,`download ${_id}.jpg`);
    
}