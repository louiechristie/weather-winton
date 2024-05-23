const babelOptions = {
  presets: ['babel-preset-gatsby'],
};

export default require('babel-jest').createTransformer(babelOptions);
