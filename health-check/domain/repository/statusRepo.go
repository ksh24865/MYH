package repository

import (
	"github.com/ksh24865/smartpark/health-check/adapter"
	"github.com/ksh24865/smartpark/health-check/domain/model"
)

type StatusRepo interface {
	UpdateTable(states adapter.States) model.SinkStatus
}
