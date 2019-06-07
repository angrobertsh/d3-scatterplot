import * as CSV_PARSER from '../utils/csv_parser';

export const getSeedData = () => dispatch => (
  CSV_PARSER.parseCsv()
    .then(data => dispatch(updateData(data)))
);

export const updateData = (data) => ({
  type: "UPDATE_DATA",
  data
});
