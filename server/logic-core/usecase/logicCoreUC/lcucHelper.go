package logicCoreUC

import (
	"strings"

	"github.com/ksh24865/smart-park/logic-core/domain/model"
)

func (lcuc *logicCoreUsecase) ToLogicData(kd *model.KafkaData) (model.LogicData, error) {
	n, err := lcuc.rr.FindNode(kd.NodeID)
	if err != nil {
		return model.LogicData{}, err
	}
	s, err := lcuc.rr.FindSensor(kd.SensorID)
	if err != nil {
		return model.LogicData{}, err
	}

	vl := map[string]float64{}
	for i, v := range s.SensorValues {
		vl[v] = kd.Values[i]
	}
	return model.LogicData{
		SensorID:   kd.SensorID,
		SensorName: s.Name,
		Values:     vl,
		Node:       *n,
		Timestamp:  kd.Timestamp,
	}, nil
}

func (lcuc *logicCoreUsecase) ToDocument(ld *model.LogicData) model.Document {
	sinkname := ld.Node.SinkName
	if sinkname[0]==' '{
		sinkname=sinkname[1:]
	}
	return model.Document{		
		Index: "smart박-" + (strings.Split(ld.SensorName,"-"))[1]+"-" + strings.ReplaceAll(sinkname," ", "-"),
		Doc:   *ld,
	}
}