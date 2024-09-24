import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { 
    globals: {
      ...globals.browser,  // Browser globals (if needed)
      ...globals.node      // Add Node.js globals to recognize `process`
    }
   }},
  pluginJs.configs.recommended,
];

