import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
const PieSingle= ({ width, half, coins, active, height,setActive })=> {
  return (
    <svg width={width} height={height}>
      <Group top={half} left={half}>
        <Pie
          data={coins}
          pieValue={(data) => data.amount * data.inUSD}
          outerRadius={half}
          innerRadius={(arc) => {
            const size = active && active.symbol === arc.data.symbol ? 12 : 10;
            return half - size;
          }}
          padAngle={0.01}
        >
          {(pie) => {
            return pie.arcs.map((arc) => {
              // console.log(arc)
              return (
                <g
                  key={arc.data.symbol}
                  onMouseEnter={() => setActive(arc.data)}
                  onMouseLeave={() => setActive(null)}
                >
                  <path d={pie.path(arc)} fill={arc.data.color}></path>
                </g>
              );
            });
          }}
        </Pie>
        <Text textAnchor="middle" dy={-20}>
          {active
            ? active.amount * active.inUSD
            : coins.reduce((a, c) => a + c.amount * c.inUSD, 0)}
        </Text>
        <Text textAnchor="middle" dy={20} fontSize={20} fill="#aaa">
          {active ? Object.keys(active).length : `${coins.length} items`}
        </Text>
      </Group>
    </svg>
  );
}
export default PieSingle