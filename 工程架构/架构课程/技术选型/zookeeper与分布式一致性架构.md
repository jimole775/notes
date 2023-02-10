# 分布式一致性算法

## Paxos 协议（早期协议）
三个角色（同一台服务器同时具备三种角色）
- Proposer: 发起投票提案
- Acceptor: 接受提案，进行投票
- Learner: 对接客户端，通知哪个是主服务器

Proposer 生产全局唯一且递增的 Proposal ID (可使用时间戳加 Server ID)，向所有 Acceptors 发送 Prepare 请求，这里无需携带提案内容，只携带 Proposal ID 即可。

Acceptor 收到 Prepare 和 Propose 请求后：
1. 不再接受 Proposal ID 小于等于当前请求的 Prepare 请求
2. 不再接受 Proposal ID 小于当前请求的 Propose 请求

## Zab 协议（zookeeper对Paxos的改造）
两个角色
- Leader
- Follower