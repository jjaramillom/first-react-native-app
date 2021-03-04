import * as android from './MainButton.android';
import * as ios from './MainButton.ios';
import MainButton from './MainButton.android';

// To validate that both Components have the same types
declare var _test: typeof ios;
declare var _test: typeof android;

/// export to get the shape of the module
export default MainButton;
