import createBookmark from './createBookmark';
import deleteBookmark from './deleteBookmark';

class BookmarkService {
  bookmark = createBookmark;
  unBookmark = deleteBookmark;
}

const bookmarkService = new BookmarkService();
export default bookmarkService;
