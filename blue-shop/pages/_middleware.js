import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

const middleware = (req, ev) => {
    console.log(req.nextUrl.pathname)
    return NextResponse.next()
}

export default middleware;