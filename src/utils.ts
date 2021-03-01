import { Field, SimpleDescription } from "@quantleaf/query-schema";

export const firstDescription = (desc:any):string => {
    if (Array.isArray(desc))
        return desc[0];
    if (desc['ANY'])
        return firstDescription(desc['ANY']);
    for (const key of Object.keys(desc)) {
        const d = firstDescription(desc[key]);
        if (d)
            return d;
    }
    return '';
}

const indent = (text:string, depth:number = 0) =>
{
    const textLines = text.split("</br>");
    const builder:string[] = [];
    for (let i = 0; i < depth; i++) {
        builder.push('&ensp;&ensp;&ensp;&ensp;')
    }
    const pad = builder.join('');
    return textLines.map(x=>pad+x).join('</br>');
}
export const strong = (text:string) =>
{
    return '<strong>' + text+ '</strong>'
}

export const pad = (text:string) =>
{
    return ' ' + text+ ' '
}

export const italic = (text:string) =>
{
    return '<i>' + text+ '</i>'
}

export const formatDate = (ms:number) => {
    const date = new Date(ms);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year +  '/' + month + '/' + day;

}




export const formatValue = (fieldsByKey:{[key:string]:Field}, key:string, value:any) => {
    const field = fieldsByKey[key];
    let ret = '';
    
    if (field.domain == 'DATE') {
        ret = formatDate(value);
        
    }
    else if (typeof field.domain != 'string' && field.domain && (field.domain as {[key:string]:string[]})[value]) // Enum domain!
    {
        let desc = firstDescription((field.domain as {[key:string]:string[]})[value]);
        if (desc)
            ret = desc;
        else 
            ret = value;
    }
    else ret = value;
    return italic(ret);
}