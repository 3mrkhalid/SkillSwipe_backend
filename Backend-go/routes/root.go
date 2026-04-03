package routes

import (
	"fmt"
	"net/http"
)

func Hello(res http.ResponseWriter , req * http.Request) {
	  if req.Method != http.MethodGet {
		fmt.Fprint(res, "Method Not Allowed!", http.StatusMethodNotAllowed)
		return
	  }

	  fmt.Fprint(res, "Welcome to skill Swipe")
}
