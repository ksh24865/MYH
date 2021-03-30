package main

import (
	"log"

	"github.com/ksh24865/smart-park/application/dataService/sql"
	"github.com/ksh24865/smart-park/application/docs"
	"github.com/ksh24865/smart-park/application/domain/model"
	"github.com/ksh24865/smart-park/application/domain/repository"
	"github.com/ksh24865/smart-park/application/rest/handler"
	"github.com/ksh24865/smart-park/application/setting"
	"github.com/ksh24865/smart-park/application/usecase/eventUsecase"
	"github.com/ksh24865/smart-park/application/usecase/registUsecase"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	ginSwagger "github.com/swaggo/gin-swagger"
	swaggerFiles "github.com/swaggo/gin-swagger/swaggerFiles"
)

func main() {
	sql.Setup()

	sir := sql.NewSinkRepo()
	ndr := sql.NewNodeRepo()
	snr := sql.NewSensorRepo()
	lgr := sql.NewLogicRepo()
	lsr := sql.NewLogicServiceRepo()
	tpr := sql.NewTopicRepo()
	acr := sql.NewActuatorkRepo()

	ru := registUsecase.NewRegistUsecase(sir, ndr, snr, lgr, lsr, tpr, acr)
	eu := eventUsecase.NewEventUsecase(sir, lsr)

	h := handler.NewHandler(ru, eu)

	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	// swagger
	docs.SwaggerInfo.Title = "ToIoT application API"
	docs.SwaggerInfo.Description = "This is a registration server for ToIoT UI."
	docs.SwaggerInfo.Version = "0.1"
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	setRegistrationRoute(r, h)
	setEventRoute(r, h)
	initTopic(tpr)

	log.Fatal(r.Run(setting.Appsetting.Server))
}

func setEventRoute(r *gin.Engine, h *handler.Handler) {
	event := r.Group("/event")
	{
		event.POST("", h.RegistLogicService)
	}
}

func setRegistrationRoute(r *gin.Engine, h *handler.Handler) {
	regist := r.Group("/regist")
	{

		sink := regist.Group("/sink")
		{
			sink.GET("", h.ListSinks)
			sink.POST("", h.RegistSink)
			sink.DELETE("/Satates:id", h.UnregistSink)
		}
		node := regist.Group("/node")
		{
			node.GET("", h.ListNodes)
			node.POST("", h.RegistNode)
			node.DELETE("/:id", h.UnregistNode)
		}
		sensor := regist.Group("/sensor")
		{
			sensor.GET("", h.ListSensors)
			sensor.POST("", h.RegistSensor)
			sensor.DELETE("/:id", h.UnregistSensor)
		}
		actuator := regist.Group("/actuator")
		{
			actuator.GET("", h.ListActuators)
			actuator.POST("", h.RegistActuator)
			actuator.DELETE("/:id", h.UnregistActuator)
		}
		logic := regist.Group("/logic")
		{
			logic.GET("", h.ListLogics)
			logic.POST("", h.RegistLogic) // << 프론트에서
			logic.DELETE("/:id", h.UnregistLogic)
		}
		logicService := regist.Group("/logic-service")
		{
			logicService.GET("", h.ListLogicServices)
			logicService.DELETE("/:id", h.UnregistLogicService)
		}
		topic := regist.Group("/topic")
		{
			topic.GET("", h.ListTopics)
			topic.POST("", h.RegistTopic)
			topic.DELETE("/:id", h.UnregistTopic)
		}
	}  
}

func initTopic(tpr repository.TopicRepo) {
	if setting.Topicsetting.Name != "" {
		t := model.Topic{
			Name:         setting.Topicsetting.Name,
			Partitions:   setting.Topicsetting.Partitions,
			Replications: setting.Topicsetting.Replications,
		}
		tpr.Create(&t)
	}
}
