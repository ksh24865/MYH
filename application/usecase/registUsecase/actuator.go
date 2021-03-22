package registUsecase

import (
	"github.com/ksh24865/smart-park/application/adapter"
	"github.com/ksh24865/smart-park/application/domain/model"
)

func (ru *registUsecase) GetActuatorPageCount(size int) int {
	return ru.acr.GetPages(size)
}

func (ru *registUsecase) GetActuators() ([]model.Actuator, error) {
	return ru.acr.FindsWithName()
}

func (ru *registUsecase) GetActuatorsPage(p adapter.Page) ([]model.Actuator, error) {
	return ru.acr.FindsPage(p)
}

func (ru *registUsecase) RegistActuator(a *model.Actuator) error {

	return ru.acr.Create(a)
}

func (ru *registUsecase) UnregistActuator(a *model.Actuator) error {
	return ru.acr.Delete(a)
}
