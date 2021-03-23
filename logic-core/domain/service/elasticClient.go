package service

import "github.com/ksh24865/smart-park/logic-core/domain/model"

type ElasticClient interface {
	GetInput() chan<- model.Document
}
