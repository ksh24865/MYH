package service

import "github.com/ksh24865/smart-park/logic-core/domain/model"

type KafkaConsumerGroup interface {
	GetOutput() <-chan model.KafkaData

	// IncreaseConsumer() error
	// DecreaseConsumer() error
}
