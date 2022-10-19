package main

import (
	"fmt"
	"log"
	"net/http"
)

const ip = "0.0.0.0"
const port = "8001"

func main() {
	http.HandleFunc("/health", func(write http.ResponseWriter, request *http.Request) {
		log.Println("Golang healthcheck.")
		fmt.Fprintf(write, "Healthy golang server.\n")
	})
	log.Println(fmt.Sprintf("Listening on %s:%s", ip, port))
	log.Fatal(http.ListenAndServe(fmt.Sprintf("%s:%s", ip, port), nil))
}
