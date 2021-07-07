cmake_minimum_required(VERSION 3.18)

project(vulkan-triangle_project)

find_package(Vulkan REQUIRED)

add_executable(sample sample.cpp include/vk_mem_alloc.cc)
target_link_libraries(sample PRIVATE Vulkan::Vulkan ${CMAKE_SOURCE_DIR}/lib/glfw3.lib)
target_include_directories(sample PUBLIC ${CMAKE_SOURCE_DIR}/include)

set(SHADERS_FILES
  "../shaders/fullscreen.frag"
  "../shaders/fullscreen.vert"
  )

foreach(FILE ${SHADERS_FILES})
  get_filename_component(FILE_NAME ${FILE} NAME)
  set(SPIRV "${PROJECT_BINARY_DIR}/shaders/${FILE_NAME}.spv")
  add_custom_command(
    OUTPUT ${SPIRV}
    COMMAND glslc --target-env=vulkan1.2 -std=460 ${FILE} -o ${SPIRV}
    DEPENDS ${FILE})
  list(APPEND SPIRV_BINARY_FILES ${SPIRV})
endforeach(FILE)

add_custom_target(shaders DEPENDS ${SPIRV_BINARY_FILES})
add_dependencies(sample shaders)
