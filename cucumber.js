module.exports = {
  default: [
    "--require-module ts-node/register",
    "--require test/features/**/*.ts",
    "--publish-quiet",
    "test/features/**/*.feature",
  ].join(" "),
};
