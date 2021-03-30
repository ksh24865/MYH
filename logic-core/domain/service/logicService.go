package service

import "github.com/ksh24865/smart-park/logic-core/domain/model"

type LogicService interface {
	CreateAndStartLogic(l *model.Logic) error
	RemoveLogic(sid, lid int) error
	GetLogicChans(sid int) (map[int]chan model.LogicData, error)
	
}
