import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame, DayObj } from 'types';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { processData, hourToString } from './utils/helpFunc';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  data: Array<DayObj> | null;
}

export class MainPanel extends PureComponent<Props> {
  state: State = {
    data: null,
  };

  componentDidMount() {
    const series = this.props.data.series as Frame[];

    if (series.length == 0) {
      return;
    }

    const { timezone, open_hour, close_hour } = this.props.options;
    const valueArray = series[0].fields[0].values.buffer.map((elm: Frame, i: number) =>
      series.reduce((sum, curr) => sum + curr.fields[0].values.buffer[i], 0)
    );
    const timestampArray = series[0].fields[1].values.buffer;

    const { data } = processData(valueArray, timestampArray, timezone, open_hour, close_hour);
    this.setState({ data });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series !== this.props.data.series) {
      const series = this.props.data.series as Frame[];

      if (series.length == 0) {
        this.setState({ data: null });
        return;
      }
      const { timezone, open_hour, close_hour } = this.props.options;

      const valueArray = series[0].fields[0].values.buffer.map((elm: Frame, i: number) =>
        series.reduce((sum, curr) => sum + curr.fields[0].values.buffer[i], 0)
      );
      const timestampArray = series[0].fields[1].values.buffer;

      const { data } = processData(valueArray, timestampArray, timezone, open_hour, close_hour);
      this.setState({ data });
    }
  }

  render() {
    const {
      width,
      height,
      options: { open_hour, close_hour },
    } = this.props;
    const { data } = this.state;

    if (!data) {
      return <div />;
    }

    return (
      <div
        style={{
          width,
          height,
          position: 'relative',
        }}
      >
        <ResponsiveHeatMap
          data={data}
          keys={hourToString(open_hour, close_hour)}
          indexBy="date"
          margin={{ top: 0, right: 0, bottom: 30, left: 40 }}
          forceSquare={true}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 36,
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            //legend: 'date',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          cellOpacity={0.7}
          cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
          colors="blues"
          // @ts-ignore
          defs={[
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(0, 0, 0, 0.1)',
              rotation: -45,
              lineWidth: 4,
              spacing: 7,
            },
          ]}
          fill={[{ id: 'lines' }]}
          animate={true}
          motionStiffness={80}
          motionDamping={9}
          // hoverTarget="cell"
          cellHoverOthersOpacity={0.25}
        />
      </div>
    );
  }
}
