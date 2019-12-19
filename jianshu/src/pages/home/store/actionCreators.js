import{ CHANGE_WRITER_PAGE } from './constants';

const changeWriterPage = page => ({
    type:CHANGE_WRITER_PAGE,
    page
})

export { changeWriterPage }