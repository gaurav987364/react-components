import newIcon from '/new.png';
import audioIcon from '/audio.png';
import docIcon from '/doc.png';
import pdfIcon from '/pdff.png';
import jsonIcon from '/json-file.png';
import zipIcon from '/zip_icon.png';
import photoshopIcon from '/photoshop.png';
import fileIcon from '/file.png';
import xlsxIcon from '/xls.png';

export interface Icontypes {
    [key: string]: string;
    default: string;
    mp4: string;
    doc: string;
    docx: string;
    pdf: string;
    json: string;
    zip: string;
    'x-zip-compressed': string;
    photoshop: string;
    file: string;
    xlsx: string;
}
export const Icons_Type : Icontypes = {
    default: newIcon,
    mp4: audioIcon,
    doc: docIcon,
    docx: docIcon,
    pdf: pdfIcon,
    json: jsonIcon,
    zip: zipIcon,
    'x-zip-compressed': zipIcon,
    photoshop: photoshopIcon,
    file: fileIcon,
    xlsx: xlsxIcon
}