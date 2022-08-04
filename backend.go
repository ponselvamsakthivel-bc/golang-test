package main

import (
	"encoding/json"
	"fmt"
	"html"
	"log"
	"net/http"
	"time"
)

type TimeData struct {
	EpochTime int64  `json:"epoch_time"`
	TimeZone  string `json:"time_zone"`
}

type JsonResponse struct {
	Type string   `json:"type"`
	Data TimeData `json:"data"`
	// Message string `json:"message"`
}

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello This is backend API which Uses Go-lang, %q", html.EscapeString(r.URL.Path))
	})

	http.HandleFunc("/epoch", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		var response = JsonResponse{Type: "success", Data: TimeData{EpochTime: currentEpochTime(), TimeZone: currentTimeZone()}}

		json.NewEncoder(w).Encode(response)
	})

	fmt.Println("Server at 10000")
	log.Fatal(http.ListenAndServe(":10000", nil))

}

func currentEpochTime() int64 {
	return time.Now().Unix()
}

func currentTimeZone() string {
	zone, _ := time.Now().Zone()
	return zone
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
