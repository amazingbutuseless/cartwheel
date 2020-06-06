const fs = require('fs');

import { app, IpcMainEvent } from "electron";
import { WebsiteMetadata } from '../common/website';

export default {
    configurations: `${ app.getPath('userData') }/websites.json`,

    read(): Array<WebsiteMetadata> {
        return JSON.parse(fs.readFileSync(this.configurations));
    },

    write(data: Array<WebsiteMetadata>): void {
        fs.writeFileSync(this.configurations, JSON.stringify(data));
    },

    get(e: IpcMainEvent): void {
        if (!fs.existsSync(this.configurations)) this.write([]);

        e.reply('websites-get-reply', this.read());
    },
    
    add(e: IpcMainEvent, website: WebsiteMetadata): void {
        let data = this.read();
        data.push(website);

        this.write(data);
        
        e.reply('website-add-reply', website);
    },

    update(e: IpcMainEvent, website: WebsiteMetadata): void {
        const items = this.read();
        
        const targetIdx = items.findIndex(item => item.url === website.url);
        items[targetIdx] = website;

        this.write(items);

        e.reply('website-update-reply', website);
    },
    
    delete(e: IpcMainEvent, website: WebsiteMetadata): void {
        const items = this.read();
        
        const targetIdx = items.findIndex(item => item.url === website.url);
        items.splice(targetIdx, 1);

        this.write(items);
        
        e.reply('website-remove-reply', website);
    },
};
