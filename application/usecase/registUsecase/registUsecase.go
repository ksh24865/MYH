package registUsecase

import "github.com/ksh24865/smart-park/application/domain/repository"

type registUsecase struct {
	sir repository.SinkRepo
	ndr repository.NodeRepo
	snr repository.SensorRepo
	lgr repository.LogicRepo
	lsr repository.LogicServiceRepo
	tpr repository.TopicRepo
	acr repository.ActuatorRepo
}

func NewRegistUsecase(sir repository.SinkRepo,
	ndr repository.NodeRepo,
	snr repository.SensorRepo,
	lgr repository.LogicRepo,
	lsr repository.LogicServiceRepo,
	tpr repository.TopicRepo,
	acr repository.ActuatorRepo) *registUsecase {
	return &registUsecase{
		sir: sir,
		ndr: ndr,
		snr: snr,
		lgr: lgr,
		lsr: lsr,
		tpr: tpr,
		acr: acr,
	}
}
