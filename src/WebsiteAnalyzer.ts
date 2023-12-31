import axios from 'axios';

export type Technology = {
    name: string;
    group: string;
    github: string | null;
    website: string | null;
    category: string;
    description: string | null;
    
    isSaaS: boolean;
    isPaid: boolean;
}

const requiredOptions = [
    'url'
];

const requiredFiles = {
    groups: __dirname + '/stack/groups.json',
    categories: __dirname + '/stack/categories.json',
    technologies: __dirname + '/stack/technologies.json',
};

class WebsiteAnalyzer {
    private options: any;

    constructor(options: any) {
        this.options = options || {};

        if (this.options.hasOwnProperty('technologies')) {
            requiredFiles.technologies = this.options.technologies;
        }

        if (this.options.hasOwnProperty('groups')) {
            requiredFiles.groups = this.options.groups;
        }

        if (this.options.hasOwnProperty('categories')) {
            requiredFiles.categories = this.options.categories;
        }
    }

    private hasAllRequiredOptions(): boolean {
        return requiredOptions.every((option) => {
            return this.options[option];
        });
    }

    public async analyze(): Promise<Technology[]> {
        if (!this.hasAllRequiredOptions()) throw new Error('Missing required options (' + requiredOptions.join(', ') + ')');

        const groups = this.options.groups;
        const categories = this.options.categories;
        const technologies = this.options.technologies;

        const url = this.options.url;

        const content = await this.getWebsiteContent(url);

        const result: Technology[] = [];

        for (const key of Object.keys(technologies)) {
            const tech = technologies[key];

            const scriptResult = this.analyzeRegex(content, tech);
            const dnsResult = await this.analyzeDns(url, tech);

            if (scriptResult) result.push(scriptResult);
            if (dnsResult) result.push(dnsResult);
        }
        
        return result;
    }

    private analyzeRegex(content: string, tech: any): Technology {
        tech = JSON.parse(JSON.stringify(tech));
        if (!tech.hints.regex) return null;

        let result: Technology = null;

        tech.hints.regex.forEach((regexString) => {
            const regex = new RegExp(regexString);
            const matches = content.match(regex);

            if (matches) {
                result = {
                    name: tech.name,
                    group: this.getGroupNameById(tech.group),
                    website: tech.website,
                    github: tech.github,
                    category: this.getCategoryNameById(tech.category),
                    description: tech.description,

                    isSaaS: tech.saas,
                    isPaid: tech.paid
                }
            }
        })

        return result;
    }

    private async analyzeDns(url: string, tech: any): Promise<Technology> {
        tech = JSON.parse(JSON.stringify(tech));
        if (!tech.hints.dns) return null;

        let result: Technology = null;

        const dns = tech.hints.dns;
        const dnsAmount = Object.keys(dns).length;
        let current = 0;
        for (var key in dns) {
            const regex = new RegExp(dns[key]);

            const domain = this.getDomainByUrl(url);
            const response = await axios.get("https://dns.google.com/resolve?name=" + domain + "&type=" + key)
            const data = response.data;
            let workWith = data.Answer || data.Authority || data.Additional;
            workWith = workWith[0].data

            const matches = workWith.match(regex);

            if (matches) {
                result = {
                    name: tech.name,
                    group: this.getGroupNameById(tech.group),
                    website: tech.website,
                    github: tech.github,
                    category: this.getCategoryNameById(tech.category),
                    description: tech.description,

                    isSaaS: tech.saas,
                    isPaid: tech.paid
                }
            }
            
        }

        return result;
    }

    private getDomainByUrl(url: string): string {
        const regex = new RegExp('^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)');
        const matches = url.match(regex);

        return matches[1];
    }

    private getGroupNameById(id: number): string {
        return this.options.groups[id].name || null;
    }

    private getCategoryNameById(id: number): string {
        return this.options.categories[id].name || null;
    }

    private async getWebsiteContent(url: string): Promise<string> {
        const response = await axios.get(url);
        return response.data;
    }
}

export default WebsiteAnalyzer;
