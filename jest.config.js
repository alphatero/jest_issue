/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  // 别名设置
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/components/$1",
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\js$": "babel-jest",
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
};
