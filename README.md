## Exoplanet Data Explorer

Explore the exoplanets with data! The Exoplanet Data Explorer plots different exoplanetary data against each other to visualize different relationships between different planetary bodies.

## How to run

`npm install`

Open the folder and double click on index.html.

### Implementation details

- Webpack for loading
- React.js components
- redux filter management
- d3 for svg rendering.

#### Loading the CSV

webpack has a `csv-loader` that turns csvs into JavaScript objects. This conversion happens on-load of the display component, saving the csv data into the redux store under the data reducer.

#### Dropdowns for selecting numeric features

After looking at the data, I determined which columns had numeric values and which did not. I saved these numeric columns as a constant under `file_constants.js`. I then linked up a select component to dispatch a filter change to either the x or y axis, updating the filter in the filter reducer. This consequently cascaded down to the graphical components to re-filter and re-render their data based on the new x or y axis filter.

#### Points plotted in the scatterplot

Filtered data influenced by the redux filters is fed to the scatterplot, which is rendered by plotting d3 circles on the svg based on this filtered data.

#### Scales for the scatterplot

Scales were added via d3s scaleLinear functions that apply a mathematical transform to turn data into appropriate svg/DOM positions.

#### Titles, margins, and other general styling

Basic CSS was written and applied to reuseable classes in order to give basic flex and padding arrangements to various elements on the page. Titles were read from the redux store, yet again, and applied on chart mount to label chart axes.

#### Binned histograms for selected features

Bar charts were made with d3's ability to plot rectangles onto an svg.

### Challenges

This implementation completely ignores d3s join capabilities owing to React's preference to trigger re-mounts of components when props change (see: putting keys on each chart component).

The variance in data makes labeling axes challenging owing to the need to support both single digits and up to 6 digits as axis tick labels.

I don't know how to style a select.
