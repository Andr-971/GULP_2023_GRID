import smartgrid from "smart-grid";
import { settingsSmatrGrid } from "../config/config.js"

export const smart_grid = async () => {
    
    smartgrid("./src/smart-grid", settingsSmatrGrid);
};
