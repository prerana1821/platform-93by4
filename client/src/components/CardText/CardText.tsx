import { Flex, Heading, Text, chakra, Image } from '@chakra-ui/react'
import { ChecksType } from '../../data/staticData/mark15'
import { theme } from '../../themes'

interface CardTextPropType {
  collapsible?: boolean
  status?: string
  title?: string
  projectName?: string
  subTitle?: string | JSX.Element
  checklist?: ChecksType[]
  checkedCount?: number
}

export function CardText({
  collapsible,
  title,
  subTitle,
  projectName,
  checklist,
  checkedCount,
}: CardTextPropType) {
  return (
    <>
      <Flex
        flexDirection={collapsible ? 'row' : 'column'}
        justifyContent={collapsible ? 'flex-start' : 'center'}
        alignItems={['center', 'flex-start']}
        flex={'1'}
        margin={['1rem 0', '']}
        textAlign={['center', 'left']}
      >
        {collapsible && (
          <Flex
            alignItems={'center'}
            marginRight={'1rem'}
            position={'relative'}
            top={'-2px'}
            minW="24px"
          >
            {checkedCount === checklist?.length ? (
              <Image
                src={'/svgs/circleCheck.svg'}
                height={'24px'}
                width={'24px'}
                alt={'link-svg'}
              />
            ) : (
              <Image
                src={'/svgs/circle.svg'}
                height={'24px'}
                width={'24px'}
                alt={'link-svg'}
              />
            )}
          </Flex>
        )}
        <Heading
          color={checkedCount === checklist?.length ? 'brand.500' : 'black.300'}
          fontSize={'1.3rem'}
          minW="110px"
        >
          {title}
        </Heading>
        {!collapsible && (
          <Text
            color={theme.colors.black['100']}
            marginTop={'0.5rem'}
            textTransform={'capitalize'}
            fontSize={'0.85rem'}
          >
            {subTitle}
          </Text>
        )}
      </Flex>
      {collapsible && (
        <Flex flex={'1'} justifyContent={'center'}>
          <Text color="brand.500" paddingLeft={'3.5rem'}>
            {checkedCount}/{checklist?.length}{' '}
            <chakra.span d={{ base: 'none', md: 'inline' }}>
              task done
            </chakra.span>
          </Text>
        </Flex>
      )}
    </>
  )
}
