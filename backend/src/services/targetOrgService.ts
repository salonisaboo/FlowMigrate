import fs from "fs";
import path from "path";

class TargetOrgService {
    private assets: Map<string, string> = new Map();

    constructor() {
        const filePath = path.join(process.cwd(), "fixtures", "target-org-state.json");

        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        data.assets.forEach((asset: any) => {
            this.assets.set(asset.name, asset.id);
        });
    }

    assetExists(name: string) {
        return this.assets.has(name);
    }
}

export const targetOrgService = new TargetOrgService();