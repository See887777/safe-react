import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Text, Identicon } from '@gnosis.pm/safe-react-components'

import { currentSafeWithNames } from 'src/logic/safe/store/selectors'
import PrefixedEthHashInfo from 'src/components/PrefixedEthHashInfo'
import Row from 'src/components/layout/Row'
import Col from 'src/components/layout/Col'
import Button from 'src/components/layout/Button'
import { primaryLite, primaryActive, smallFontSize, md } from 'src/theme/variables'
import NetworkLabel from 'src/components/NetworkLabel/NetworkLabel'
import { nftTokensSelector } from 'src/logic/collectibles/store/selectors'

const IdenticonContainer = styled.div`
  position: relative;
  margin-bottom: ${md};
`

const SafeThreshold = styled.div`
  position: absolute;
  left: -6px;
  top: -6px;
  background: ${primaryLite};
  color: ${primaryActive};
  font-size: ${smallFontSize};
  font-weight: bold;
  border-radius: 100%;
  padding: 4px;
  z-index: 2;
  min-width: 24px;
  min-height: 24px;
  box-sizing: border-box;
`

const StyledText = styled(Text)`
  margin-top: 4px;
  font-size: 24px;
  font-weight: bold;
`

const NetworkLabelContainer = styled.div`
  & span {
    bottom: auto;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Overview = (): ReactElement => {
  const { address, name, owners, threshold, balances } = useSelector(currentSafeWithNames)
  const nftTokens = useSelector(nftTokensSelector)

  return (
    <Container>
      <Row margin="md">
        <Col layout="column">
          <IdenticonContainer>
            {threshold && (
              <SafeThreshold>
                {threshold}/{owners.length}
              </SafeThreshold>
            )}
            <Identicon address={address} size="lg" />
          </IdenticonContainer>
          <Text size="xl" strong>
            {name}
          </Text>
          <PrefixedEthHashInfo hash={address} shortenHash={4} textSize="lg" />
        </Col>
        <Col end="xs">
          <NetworkLabelContainer>
            <NetworkLabel />
          </NetworkLabelContainer>
        </Col>
      </Row>
      <Row>
        <Col layout="column" md={3}>
          <Text color="inputDefault" size="md">
            Tokens
          </Text>
          <StyledText size="xl">{balances.length}</StyledText>
        </Col>
        <Col layout="column" md={3}>
          <Text color="inputDefault" size="md">
            NFTs
          </Text>
          <StyledText size="xl">{nftTokens.length}</StyledText>
        </Col>
        <Col end="xs" md={6}>
          <Button size="md" variant="contained" color="primary">
            Open Safe
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Overview
