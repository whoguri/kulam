import { range } from "../../helper"

export default function Pagination(props) {
    const { count = 0, limit = 15, page = 0, setPage, setLimit } = props
    let pageCount = (count - 1) / limit
    if (pageCount === -0.1) {
        pageCount = 0
    }


    pageCount = parseInt(pageCount)
    let start = page - 4
    if (start < 0) {
        start = 0
    }
    let end = start + 14
    if (end > pageCount) {
        end = pageCount
        start = end - 14
        if (start < 0) {
            start = 0
        }
    }
    const from = (page * limit) + 1
    let to = (page * limit) + limit
    if (to > count) {
        to = count
    }
    return (<nav className="md:px-4 py-4 border-t border-t-primary isolate inline-flex -space-x-px items-center w-full justify-between pt-4" aria-label="Pagination">
        <div className="flex flex-wrap items-center">
            <button type="button" onClick={() => {
                if (page > 0) {
                    window.scrollTo(0, 0)
                    setPage(page - 1)
                }
            }} disabled={page === 0} className="disabled:pointer-events-none disabled:opacity-60 hover:bg-primary hover:text-white cursor-pointer  transition duration-300 ease-in-out  md:px-2 md:py-2 px-1 py-1 border border-light rounded-s-md flex items-center justify-center text-xs md:text-sm  outline-0">
                <svg className="md:h-5 md:w-5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z" /></svg>
                <span className="sr-only">Previous</span>
            </button>

            {range(start, end, 1).map((e, i) => <div key={i}
                onClick={() => {
                    if (page !== e) {
                        window.scrollTo(0, 0)
                        setPage(e)
                    }
                }}
                className={`${page === e ? "bg-primary text-white hover:text-white cursor-default" : "hover:bg-white hover:text-primary text-primary"} cursor-pointer font-bold  block lg:px-2 text-center lg:py-2 px-2 py-1 border border-light  text-xs lg:text-sm  outline-0`}>
                <div className="md:h-5 md:w-5 h-4 w-4">{e + 1}
                </div>
            </div>
            )}
            <button type="button" onClick={() => {

                if (page < parseInt(pageCount)) {
                    window.scrollTo(0, 0)
                    setPage(page + 1)
                }
            }} disabled={!(page < parseInt(pageCount))} className="disabled:opacity-60 disabled:pointer-events-none hover:bg-primary hover:text-white cursor-pointer font-medium  block lg:px-2 lg:py-2 px-2 py-1 border border-light rounded-e-lg text-xs lg:text-sm  outline-0">
                <span className="sr-only">Next</span>
                <svg className="md:h-5 md:w-5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6l4.6-4.6Z" /></svg>

            </button>
        </div>
        <div>
            <div className="flex items-center gap-2">
                <select value={limit}
                    onChange={(e) => {
                        setLimit(parseInt(e.target.value))
                    }}
                    className="text-primary font-light w-auto block lg:px-2 lg:py-2 px-2 py-1 border border-light rounded-lg text-xs lg:text-sm  outline-0">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    </nav>
    )
}