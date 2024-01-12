package router

import (
	"backend/middleware"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() http.Handler {
	router := mux.NewRouter()

	// CORS middleware
	cors := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}), // Update this with your allowed origins
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	router.Use(cors) // Applying CORS middleware to all routes

	router.HandleFunc("/api/stock/{id}", middleware.GetStock).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/stock", middleware.GetAllStock).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/newstock", middleware.CreateStock).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/stock/{id}", middleware.UpdateStock).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deletestock/{id}", middleware.DeleteStock).Methods("DELETE", "OPTIONS")

	router.HandleFunc("/api/invoice/{id}", middleware.GetInvoice).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/invoice", middleware.GetAllInvoice).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/newinvoice", middleware.CreateInvoice).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/updateinvoice/{id}", middleware.UpdateInvoice).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteinvoice/{id}", middleware.DeleteInvoice).Methods("DELETE", "OPTIONS")

	return router
}
