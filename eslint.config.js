// Configuração básica para Vite + React
export default {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  plugins: ["react"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  settings: {
    react: { version: "detect" }
  },
  rules: {
    "react/react-in-jsx-scope": "off"
  }
}